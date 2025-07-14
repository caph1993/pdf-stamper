<template>
  <div>
    <h1>Drop PDFs, Rearrange, and Merge</h1>
    <div id="dropzone"
         @dragover.prevent
         @drop="onDrop"
         style="height: 100px;">
      Drop PDF files here
    </div>

    <button @click="selectFiles">Select PDF Files</button>
    <input type="file" ref="fileInput" multiple accept=".pdf" style="display: none" @change="onFileSelect" />


    <div v-for="(file, index) in pdfFiles" :key="index"
         class="file-item"
         draggable="true"
         @dragstart="onDragStart(index, $event)"
         @drop="onReorder(index)"
         @dragover.prevent>
      {{ file.name }}
    </div>

    <button @click="selectLogo">Select Logo</button>
    <p v-if="logoPath">Selected: {{ logoPath }}</p>

    <button @click="mergeAndStamp">Merge and Stamp</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { mergeAndStamp as mergeAndStampPDF } from './pdf-utils';
import { open } from '@tauri-apps/plugin-dialog'


const fileInput = ref<HTMLInputElement | null>(null)

function selectFiles() {
  fileInput.value?.click()
}

const pdfFiles = ref<File[]>([])

function onDrop(e: DragEvent) {
  const dropped = Array.from(e.dataTransfer?.files ?? []).filter(f => f.name.endsWith('.pdf'))
  pdfFiles.value.push(...dropped)
  console.log('Dropped files:', pdfFiles.value)
}

const dragIndex = ref<number | null>(null)

function onDragStart(index: number, e: DragEvent) {
  dragIndex.value = index
  e.dataTransfer?.setData('text/plain', index.toString()) // ← required!
}

function onReorder(targetIndex: number) {
  if (dragIndex.value === null || dragIndex.value === targetIndex) return
  const item = pdfFiles.value.splice(dragIndex.value, 1)[0]
  pdfFiles.value.splice(targetIndex, 0, item)
  dragIndex.value = null
}

async function mergeAndStamp() {
  const firstFileName = pdfFiles.value[0]?.name || null;
  const buffers = await Promise.all(pdfFiles.value.map(f => f.arrayBuffer()))
  await mergeAndStampPDF(buffers, logoPath.value, firstFileName)
}


function onFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input.files ?? []).filter(f => f.name.endsWith('.pdf'))
  pdfFiles.value.push(...files)
  input.value = '' // allow re-selection of same files
}


const logoPath = ref<string | null>(null)

async function selectLogo() {
  const file = await open({
    title: 'Select PNG logo',
    multiple: false,
    filters: [{ name: 'PNG/JPEG Images', extensions: ['png', 'jpg'] }]
  })
  if (typeof file === 'string') {
    logoPath.value = file
  }
}

</script>