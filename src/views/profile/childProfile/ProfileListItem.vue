<template>
  <div class="profile-list-item">
    <slot name="image"></slot>
    <slot name="desc"></slot>
  </div>
</template>

<script>
export default {
  name: 'ProfileListItem'
}
</script>