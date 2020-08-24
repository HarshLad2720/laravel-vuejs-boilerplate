<template>
  <ul class="menu-nav">
    <li class="menu-section">
      <h4 class="menu-text">Master</h4>
      <i class="menu-icon flaticon-more-v2"></i>
    </li>

      <router-link
          to="users"
          v-slot="{ href, navigate, isActive, isExactActive }"
      >
          <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item"
              :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
          >
              <a :href="href" class="menu-link" @click="navigate">
                  <i class="menu-icon flaticon2-architecture-and-city"></i>
                  <span class="menu-text">User</span>
              </a>
          </li>
      </router-link>

      <router-link
          to="role"
          v-slot="{ href, navigate, isActive, isExactActive }"
      >
          <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item"
              :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
          >
              <a :href="href" class="menu-link" @click="navigate">
                  <i class="menu-icon flaticon2-expand"></i>
                  <span class="menu-text">Role</span>
              </a>
          </li>
      </router-link>

      <router-link
          to="permission"
          v-slot="{ href, navigate, isActive, isExactActive }"
      >
          <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item"
              :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
          >
              <a :href="href" class="menu-link" @click="navigate">
                  <i class="menu-icon flaticon2-expand"></i>
                  <span class="menu-text">Permission</span>
              </a>
          </li>
      </router-link>

      <router-link
          to="country"
          v-slot="{ href, navigate, isActive, isExactActive }"
      >
          <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item"
              :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
          >
              <a :href="href" class="menu-link" @click="navigate">
                  <i class="menu-icon flaticon2-expand"></i>
                  <span class="menu-text">Country</span>
              </a>
          </li>
      </router-link>

      <router-link
              to="state"
              v-slot="{ href, navigate, isActive, isExactActive }"
      >
          <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                  :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
          >
              <a :href="href" class="menu-link" @click="navigate">
                  <i class="menu-icon flaticon2-expand"></i>
                  <span class="menu-text">State</span>
              </a>
          </li>
      </router-link>

      <router-link
          to="city"
          v-slot="{ href, navigate, isActive, isExactActive }"
      >
          <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item"
              :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
          >
              <a :href="href" class="menu-link" @click="navigate">
                  <i class="menu-icon flaticon2-expand"></i>
                  <span class="menu-text">City</span>
              </a>
          </li>
      </router-link>

      <router-link
          to="hobby"
          v-slot="{ href, navigate, isActive, isExactActive }"
      >
          <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item"
              :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
          >
              <a :href="href" class="menu-link" @click="navigate">
                  <i class="menu-icon flaticon2-expand"></i>
                  <span class="menu-text">Hobby</span>
              </a>
          </li>
      </router-link>
  </ul>
</template>

<script>
export default {
  name: "KTMenu",
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    }
  }
};
</script>
