import { tablePaginationToSearchOptions, responseToPagination, updateArray, enumToOptions, currentDate, isEmpty, cleanUpdates, formatDate } from "@/composables/useUtils";
import { SortDirection, UpdatePayload } from "@/types/common";
import { BrokerUnderwriter } from "@mcap/deal-common";
import { ref } from "vue";

describe("useUtils composable", () => {
  it("tablePaginationToSearchOptions", () => {
    let options = tablePaginationToSearchOptions({
      rowsPerPage: 10,
      page: 2,
    });

    expect(options).toEqual({
      pageSize: 10,
      pageNumber: 2,
      includeTotalRecordCount: true,
      includeSearchResult: true,
      sort: [],
    });

    options = tablePaginationToSearchOptions({
    });

    expect(options).toEqual({
      pageSize: 20,
      pageNumber: 1,
      includeTotalRecordCount: true,
      includeSearchResult: true,
      sort: [],
    });

    options = tablePaginationToSearchOptions({
      sortBy: "abc"
    });

    expect(options.sort).toEqual([{
      name: "abc",
      type: SortDirection.Asc
    }]);

    options = tablePaginationToSearchOptions({
      sortBy: "cba",
      descending: true
    });

    expect(options.sort).toEqual([{
      name: "cba",
      type: SortDirection.Desc
    }]);
  });

  it("responseToPagination", () => {
    const pagination = responseToPagination({
      totalRecordCount: 1,
      pageNumber: 2,
      pageSize: 3,
      results: []
    });

    expect(pagination).toEqual({
      page: 2,
      rowsPerPage: 3,
      rowsNumber: 1
    });
  });

  it("updateArray", () => {
    const arr = [{ id: 1 }];
    updateArray(
      arr,
      item => item.id === 1,
      { id: 2 }
    );

    expect(arr[0].id).toEqual(2);

    const arr2 = [{ id: 1 }];
    updateArray(
      arr2,
      item => item.id === 2,
      { id: 3 }
    );

    expect(arr2[0].id).toEqual(1);

    const arr3 = ref([{ id: 3 }]);
    updateArray(
      arr3.value,
      item => item.id === 3,
      { id: 4 }
    );

    expect(arr3.value[0].id).toEqual(4);
  });

  it("enumToOptions", () => {
    enum TEST {
      ONE = "one",
      TWO = "two"
    }
    let options = enumToOptions(
      TEST
    );

    expect(options).toEqual([
      { label: "one", value: "one" },
      { label: "two", value: "two" },
    ]);

    options = enumToOptions(
      TEST,
      [TEST.ONE]
    );

    expect(options).toEqual([
      { label: "two", value: "two" },
    ]);

    options = enumToOptions(
      TEST,
      [],
      "name"
    );

    expect(options).toEqual([
      { name: "one", value: "one" },
      { name: "two", value: "two" },
    ]);

    options = enumToOptions(
      TEST,
      [],
      "name",
      "test"
    );

    expect(options).toEqual([
      { name: "one", test: "one" },
      { name: "two", test: "two" },
    ]);
  });

  it("currentDate", () => {
    let date = currentDate();

    expect(typeof date).toBe("string");

    date = currentDate(false);
    expect(date).toBeInstanceOf(Date);
  });

  it("isEmpty", () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it("formatDate", () => {
    expect(formatDate("")).toBe("");
    expect(formatDate("1993-12-13")).toBe("1993-12-13");
  });

  it("cleanUpdates", () => {
    interface TestObject {
      a: string;
      b: string;
      c: string;
    }
    const arr: TestObject[] = [
      { a: "1", b: "test1", c: "test11" },
      { a: "2", b: "test2", c: "test22" }
    ];
    let updates: UpdatePayload<TestObject> = {
      "1": {
        b: "test111",
        c: "test11"
      },
      "2": {
        b: "test2",
        c: "test2222",
      }
    };

    let newUpdates = cleanUpdates({
      originalArray: arr,
      where: (obj, key) => obj.a === key,
      updates
    });
    expect(newUpdates).toEqual({
      "1": {
        b: "test111"
      },
      "2": {
        c: "test2222",
      }
    });

    updates = {
      "1": {
        b: "test111",
        c: "test11"
      },
      "2": {
        b: "test2",
        c: "test2222",
      }
    };

    newUpdates = cleanUpdates({
      originalArray: arr,
      where: (obj, key) => obj.a === key,
      updates,
      ignores: ["c"]
    });
    expect(newUpdates).toEqual({
      "1": {
        b: "test111"
      },
    });

    updates = {
      "1": {
        b: "test111",
        c: "test11"
      },
      "2": {
        b: "test2",
        c: "test2222",
      }
    };

    newUpdates = cleanUpdates({
      originalArray: arr,
      where: (obj, key) => obj.a === key,
      updates,
      ignores: ["c"]
    });
    expect(newUpdates).toEqual({
      "1": {
        b: "test111"
      },
    });

    updates = {
      "1": {
        b: "test1",
        c: "test11"
      },
      "2": {
        b: "test2",
        c: "test2222",
      }
    };

    newUpdates = cleanUpdates({
      originalArray: arr,
      where: (obj, key) => obj.a === key,
      updates,
      ignores: ["c"]
    });
    expect(newUpdates).toEqual({});

    expect(() => cleanUpdates({
      originalArray: arr,
      where: (obj, key) => key === "magic",
      updates,
    })).toThrowError("Item to update not found");
  });
});
