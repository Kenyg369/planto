<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";

const { user } = useAuth();
</script>

<template>
  <QHeader
    elevated
    class="bg-primary text-white"
  >
    <QToolbar>
      <QBtn
        :to="{ name: 'home' }"
        stretch
        flat
        label="Planto"
      />

      <QSpace />

      <QBtn
        stretch
        flat
        :to="{ name: 'products' }"
        :label="$t('routes.products')"
      />
      <QSeparator vertical />
      <QBtn
        stretch
        flat
        :to="{ name: 'about' }"
        :label="$t('routes.about')"
      />
      <QSeparator
        v-if="!user"
        vertical
      />
      <QBtn
        v-if="!user"
        stretch
        flat
        :to="{ name: 'signIn' }"
        :label="$t('routes.signIn')"
      />
      <QSeparator vertical />
      <QBtn
        v-if="!user"
        stretch
        flat
        :to="{ name: 'signUp' }"
        :label="$t('routes.signUp')"
      />
      <QBtnDropdown
        v-if="user"
        stretch
        flat
        :label="user.name"
      >
        <QList>
          <QItem
            v-close-popup
            clickable
            tabindex="0"
          >
            <QItemSection avatar>
              <QAvatar
                icon="exit"
                color="secondary"
                text-color="white"
              />
            </QItemSection>
            <QItemSection>
              <QItem-label>{{ $t("common.signOut") }}</QItem-label>
            </QItemSection>
          </QItem>
        </QList>
      </QBtnDropdown>
    </QToolbar>
  </QHeader>
</template>
