<template lang="html">

  <section :class="'hero ' + options">
    <slot>

    </slot>
  </section>

</template>

<script>
export default {
  props: ['options']
}
</script>

<style lang="css">
</style>
