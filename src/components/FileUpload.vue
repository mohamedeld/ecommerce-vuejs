<script setup lang="ts">
import { ref } from "vue";
import { useDropZone } from "@vueuse/core";
import { useFileDialog } from '@vueuse/core'
interface IProps {
  multiple: boolean
}
const props = defineProps<IProps>();

const { open, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
})

onChange((files) => {
  /** do something with files */
  emit('onChange',files)
})

const emit = defineEmits(['onDrop','onChange'])

const mainImageDropRef = ref<HTMLDivElement>();
function onDrop(files: File[] | null) {
  // called when files are dropped on zone
  emit('onDrop',files)
}
const { isOverDropZone } = useDropZone(mainImageDropRef, {
  onDrop,
  // specify the types of data to be received.
  dataTypes: ["images/*"],
  // control multi-file drop
  multiple: props?.multiple,
  // whether to prevent default behavior for unhandled events
  preventDefaultForUnhandled: false,
});
</script>

<template>
  <div
    ref="mainImageDropRef"
    class="rounded-lg h-40 border dark:border-gray-600 flex items-center justify-center mt-2 transition-all overflow-hidden"
    :class="{
      'animate-pulse ring-4 ring-teal-500 bg-teal-50 border-teal-500  dark:bg-teal-400 ring-opacity-20':
        isOverDropZone,
    }"
    @click="() => open()"
  >
    <div class="text-center cursor-pointer">
      <p>Drag some files here</p>
      <p class="text-xs mt-1 text-gray-500">or click here to upload</p>
    </div>
  </div>
</template>
