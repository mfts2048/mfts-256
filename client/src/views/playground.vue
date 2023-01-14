<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import type { CollapseProps } from 'ant-design-vue';
import { Input } from 'ant-design-vue'
import { SettingOutlined, InboxOutlined, CloseOutlined } from '@ant-design/icons-vue';
import dayjs from "dayjs";
import { message } from 'ant-design-vue';

import { conversion } from '../utils'
import MagicString from 'magic-string'
import { articleDelete, articleFindAll, articleUpdate } from '../apis'
import type { UploadChangeParam } from 'ant-design-vue';

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

const deleteItem = async (item: DataType, index: number) => {
  await articleDelete({
    id: item.id
  })
  list.value.splice(index, 1)
}

const fileList = ref([])
const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
    search()
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const handleDrop = (e: DragEvent) => {
  console.log(e);
}
</script>

<template>
  <div class="container">

    <a-upload-dragger :showUploadList="false" v-model:fileList="fileList" name="file" :multiple="true"
      action="http://localhost:3000/articles/upload" @change="handleChange" @drop="handleDrop">
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </a-upload-dragger>

    <br>

    <a-input-search size="large" v-model:value="input3" placeholder="input search loading with enterButton"
      :loading="false" enter-button @search="search" />
    <br>
    <br>

    <!-- <a-button type="primary">123465789</a-button> -->
    <a-collapse v-model:activeKey="activeKey" :expand-icon-position="expandIconPosition" accordion>
      <a-collapse-panel v-for="(item, index) in list" :key="item.id" :header="item.header">
        <div v-if="!item.edit" class="html_content" v-html="item.s?.toString()"></div>
        <div v-else class="update">
          <TextArea type="textarea" v-model:value="item.content" autoSize></TextArea>
          <div class="flex-end">
            <a-button type="primary" @click="updateItem(item)">更新</a-button>
          </div>
        </div>

        <template #extra>
          <span class="mr-18">{{ item.update_time }}</span>
          <setting-outlined class="mr-18" @click="(e: MouseEvent) => handleClick(e, item)" />
          <close-outlined @click="deleteItem(item, index)" />
        </template>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
