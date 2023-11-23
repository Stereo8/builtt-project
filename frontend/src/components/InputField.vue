<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps<{ placeholder: string, label: string, type?: string, modelValue: string }>()
const emits = defineEmits<{
  (e: 'update', value: string): void,
}>()

const hasFocus = ref(false)
const text = ref('')

const labelDisplay = computed(() => (props.modelValue ? props.label : (hasFocus.value ? props.label : props.placeholder)))
</script>

<template>
  <div>
    <div class="inputField">
      <input :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
             :type="type || 'text'"
             required
             @focus="hasFocus = true"
             @blur="hasFocus = false"
             @keyup.enter="emits('submit')"/>
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>{{ labelDisplay }}</label>
    </div>
  </div>

</template>

<style lang="scss" scoped>
$bg-color: #ffffff;
$hl-color: #000000;
$muted-color: #757575;
$trans-time: 300ms;
$width: 420px;

*,
:before,
:after {
  box-sizing: border-box;
}

.inputField {
  position: relative;
  @apply my-2;
}

textarea {
  resize: none;
}

input,
textarea {
  background: none;
  color: #000;
  font-size: 18px;
  padding: 10px 10px 10px 0;
  display: block;
  width: $width;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid $muted-color;

  &:focus {
    outline: none;
  }

  &:focus ~ label,
  &:valid ~ label {
    top: -14px;
    font-size: 12px;
    color: $hl-color;
  }

  &:focus ~ .bar:before {
    width: $width;
  }
}

input[type="password"] {
  letter-spacing: 0.2em;
}

label {
  color: $muted-color;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  top: 10px;
  transition: $trans-time ease all;
}

.bar {
  position: relative;
  display: block;
  width: $width;

  &:before {
    content: '';
    height: 2px;
    width: 0;
    bottom: 0px;
    position: absolute;
    background: $hl-color;
    transition: $trans-time ease all;
    left: 0%;
  }
}

</style>