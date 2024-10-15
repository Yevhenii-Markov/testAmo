<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 40px;
  border: none;
  border-radius: 4px;
  background: #fff;
  color: #333;
  border: 1px solid grey;
  font-weight: bold;
  cursor: pointer;

  &.active {
    background: #4c8bf8;
    border: 1px solid #4c8bf8;
    color: #fff;
  }
}
</style>

