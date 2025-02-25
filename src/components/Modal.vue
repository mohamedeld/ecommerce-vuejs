<script setup lang="ts">
   import {defineModel,defineProps,defineEmits} from "vue"
  import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Props{
  title?:string;
  description?:string;
}
defineProps<Props>()
const isOpen = defineModel('isOpen', {
  type: Boolean,
  required:true,
  default: false,
});

const emit = defineEmits(['onClose']);
</script>


<template>
  <Dialog :open="isOpen" @update:open="emit('onClose')">
    <DialogContent class="max-h-[40rem] overflow-y-auto rounded-lg">
      <DialogHeader>
        <DialogTitle v-if="title">{{ title }}</DialogTitle>
        <DialogDescription v-if="description">
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <slot></slot>
      
    </DialogContent>
  </Dialog>
</template>


