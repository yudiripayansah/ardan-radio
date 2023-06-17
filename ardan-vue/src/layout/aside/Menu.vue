<template>
<ul class="menu-nav">
  <router-link :to="mn.target" v-slot="{ href, navigate, isActive, isExactActive }" v-for="(mn,mnIndex) in menu" :key="mnIndex">
  <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item menu-item-submenu" v-bind:class="[{ 'menu-item-open': hasActiveChildren(mn.target+'/') }, isActive && 'menu-item-active', isExactActive && 'menu-item-active']">
    <a :href="href" class="menu-link menu-toggle" @click="(mn.children && mn.children.length > 0) ? false : navigate">
      <i :class="mn.icon"></i>
      <span class="menu-text">{{mn.label}}</span>
      <i class="menu-arrow" v-if="mn.children && mn.children.length > 0"></i>
    </a>
    <div class="menu-submenu" v-if="mn.children && mn.children.length > 0">
      <ul class="menu-subnav">
        <router-link :to="mn.target+'/'+mnc.target" v-slot="{ href, navigate, isActive, isExactActive }" v-for="(mnc,mncIndex) in mn.children" :key="mncIndex">
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item" :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]">
            <a :href="(mnc.children && mnc.children.length > 0) ? '#' : href" class="menu-link menu-toggle" @click="(mnc.children && mnc.children.length > 0) ? false : navigate">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">{{mnc.label}}</span>
              <i class="menu-arrow" v-if="mnc.children && mnc.children.length > 0"></i>
            </a>
            <div class="menu-submenu" v-if="mnc.children && mnc.children.length > 0">
              <ul class="menu-subnav">
                <router-link :to="mn.target+'/'+mnc.target+'/'+mncc.target" v-slot="{ href, navigate, isActive, isExactActive }" v-for="(mncc,mnccIndex) in mnc.children" :key="mnccIndex">
                  <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item" :class="[
                        isActive && 'menu-item-active',
                        isExactActive && 'menu-item-active'
                      ]">
                    <a :href="href" class="menu-link menu-toggle" @click="(mncc.children && mncc.children.length > 0) ? false : navigate">
                      <i class="menu-bullet menu-bullet-dot">
                        <span></span>
                      </i>
                      <span class="menu-text">{{mncc.label}}</span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </div>
          </li>
        </router-link>
      </ul>
    </div>
  </li>
  </router-link>
</ul>
</template>

<script>
import menu from '@/core/config/menu'
export default {
  name: "KTMenu",
  data() {
    return {
      menu: menu
    }
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    }
  },
};
</script>
