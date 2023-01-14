<script setup lang="ts">
import {
  NInput, NScrollbar, NConfigProvider,
  darkTheme, NButton,
  NSpace, NCard, NLayout, NTab,
  NTabs, NDivider, useMessage,NH2
} from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import { onMounted, ref, unref } from 'vue'
import { conversion } from './utils'
import MagicString from 'magic-string'
import { articleDelete, articleFindAll, articleUpdate } from './apis/index'

const theme = ref<GlobalTheme | null>(darkTheme)
const tabs = ref<string>('common')

interface DataType {
  id: number
  key: string;
  name: string;
  age: number;
  content: string;
  create_by: string;
  link?: string;
  s?: MagicString
}

const input3 = ref('')
const list = ref<DataType[]>([])

onMounted(() => {
  search()
})

const search = (e?: any) => {
  if (e instanceof KeyboardEvent) {
    if (e?.key === 'Enter') {
      if (unref(input3) === 'change theme') {
        if (theme.value) {
          theme.value = null
        } else {
          theme.value = darkTheme
        }
      } else {
        findAll()
      }
    }
  } else if (e instanceof PointerEvent) {
    findAll(true)
  } else {
    findAll()
  }
}

const findAll = (isClear?: boolean) => {
  articleFindAll({
    keyword: isClear ? '' : input3.value,
  })
    .then((res) => res.data)
    .then((res) => {
      res.data.forEach((item: any) => {
        item.s = conversion(item.content)
      });
      list.value = res.data || []
    })
}

const updateItem = async (item: DataType) => {
  await articleUpdate({
    id: item.id,
    content: item.content
  })
  search()
}

const deleteItem = async (item: DataType) => {
  await articleDelete({
    id: item.id
  })

  search()
}

</script>

<template>
  <NConfigProvider :theme="theme">
    <NLayout>
      <NScrollbar style="height: 100vh">
        <div class="container">

          <NH2 :size="24">
            What are you looking for
          </NH2>

          <NSpace :wrap-item="true" item-style="width: 100%">

            <NCard>
              <div class="search">
                <NInput type="text" placeholder="可以清除" v-model:value="input3" clearable passively-activated
                  @keyup="search" @clear="search" />
              </div>

              <div class="tabs">
                <NTabs type="line" v-model:value="tabs">
                  <NTab name="common">
                    三十六计走为上策
                  </NTab>
                  <NTab name="edit">
                    垂死坚持
                  </NTab>
                </NTabs>
              </div>

              <ol class="result">
                <li v-for="item in list">
                  <div v-if="tabs === 'common'" class="content" v-html="item.s?.toString()"></div>
                  <div v-else class="update">
                    <NInput type="textarea" v-model:value="item.content" :autosize="{ minRows: 4 }"></NInput>
                    <NDivider vertical />
                    <NButton type="primary" @click="updateItem(item)">更新</NButton>
                    <NDivider vertical />
                    <NButton type="primary" @click="deleteItem(item)">删除</NButton>
                  </div>
                </li>
              </ol>
            </NCard>
          </NSpace>
        </div>
      </NScrollbar>
    </NLayout>
  </NConfigProvider>
</template>
