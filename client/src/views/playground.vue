<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import type { CollapseProps } from 'ant-design-vue';
import { Input } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue';
import dayjs from "dayjs";

import { conversion } from '../utils'
import MagicString from 'magic-string'
import { articleDelete, articleFindAll, articleUpdate } from '../apis'

const TextArea = Input.TextArea
const activeKey = ref(['1']);
const expandIconPosition = ref<CollapseProps['expandIconPosition']>('left');

const handleClick = (event: MouseEvent, item: DataType) => {
  item.edit = !item.edit
  event.stopPropagation();
};
watch(activeKey, val => {
  console.log(val);
});

interface DataType {
  id: number
  key: string;
  update_time: string;
  content: string;
  header?: string;
  link?: string;
  s?: MagicString,
  edit: boolean
}

const input3 = ref('')
const list = ref<DataType[]>([])

onMounted(() => {
  search()
})

const search = (e?: any) => {
  if (e instanceof KeyboardEvent) {
    if (e?.key === 'Enter') {
      findAll()
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
        item.header = item.content?.split('\n')?.[0]
        item.edit = false
        item.update_time = dayjs(item.update_time).format('YYYY-MM-DD hh:ss:mm')
      });
      list.value = res.data || []

      // activeKey.value = [res.data?.[0]?.id]
    })
}
//
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
  <div class="container">
    <a-input-search size="large" v-model:value="input3" placeholder="input search loading with enterButton"
      :loading="false" enter-button @search="search" />

    <br>
    <br>
    <br>

    <a-collapse v-model:activeKey="activeKey" :expand-icon-position="expandIconPosition" accordion>
      <a-collapse-panel v-for="item in list" :key="item.id" :header="item.header">
        <div v-if="!item.edit" class="html_content" v-html="item.s?.toString()"></div>
        <div v-else class="update">
          <TextArea type="textarea" v-model:value="item.content" autoSize></TextArea>
          <div class="flex-end">
            <a-button type="primary" @click="updateItem(item)">更新</a-button>
            <a-button type="danger" @click="deleteItem(item)">删除</a-button>
          </div>
        </div>

        <template #extra>
          <span class="mr-18">{{ item.update_time }}</span>
          <setting-outlined @click="(e: MouseEvent) => handleClick(e, item)" />
        </template>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
