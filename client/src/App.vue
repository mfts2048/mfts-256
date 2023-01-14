<script setup lang="ts">
// import {
//   NMessageProvider,
//   NLayout,
//   NLayoutSider,
//   NMenu, GlobalTheme, darkTheme,
//   NConfigProvider,
//   NUpload, NUploadDragger
// } from 'naive-ui'

// import { h, ref } from 'vue'
// import type { Component } from 'vue'
// import { NIcon } from 'naive-ui'
// import type { MenuOption, GlobalThemeOverrides } from 'naive-ui'
// import { LogoVue, LogoIonic } from '@vicons/ionicons5'
// import { RouterLink } from 'vue-router'
// import { CloudUpload } from '@vicons/ionicons5'
//
// const theme = ref<GlobalTheme | null>(darkTheme)
//
// function renderIcon(icon: Component) {
//   return () => h(NIcon, null, { default: () => h(icon) })
// }
//
// const menuOptions: MenuOption[] = [
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             path: '/'
//           }
//         },
//         { default: () => '上班' }
//       ),
//     key: 'hear-the-wind-sing',
//     icon: renderIcon(LogoIonic)
//   },
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             path: '/page2'
//           }
//         },
//         { default: () => '上班' }
//       ),
//     key: 'dance-dance-dance',
//     icon: renderIcon(LogoVue)
//   }
// ]
//
// const lightThemeOverrides: GlobalThemeOverrides = {
//   common: {
//     primaryColor: '#1677ff',
//     borderRadius: '0px'
//   }
// }
//
// const darkThemeOverrides = {
//   common: {
//     // primaryColor: '#1677ff',
//     borderRadius: '2px'
//   }
// }
//
// // const message = useMessage()
// const bindUploadFinish = () => {
//   // message.success("ddd")
// }
//
// const collapsed = ref(false)
</script>

<template>
<!--      <n-layout content-style="height: 100vh" has-sider>-->
<!--        <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"-->
<!--          @collapse="collapsed = true" @expand="collapsed = false">-->

<!--          <div style="padding: 20px 18px">-->
<!--            <NUpload :show-file-list="false" @finish="bindUploadFinish" multiple directory-dnd-->
<!--                     action="http://localhost:3000/articles/upload" :max="5">-->
<!--              <NUploadDragger>-->
<!--                <NIcon size="24" :depth="3">-->
<!--                  <CloudUpload />-->
<!--                </NIcon>-->
<!--              </NUploadDragger>-->
<!--            </NUpload>-->
<!--          </div>-->

<!--          <n-menu default-value="hear-the-wind-sing" :collapsed="collapsed" :collapsed-width="64"-->
<!--            :collapsed-icon-size="22" :options="menuOptions" />-->

<!--        </n-layout-sider>-->
<!--        <n-layout>-->
<!--          -->
<!--        </n-layout>-->
<!--      </n-layout>-->
      <RouterView />
</template>
