<script lang="ts">
  import Header from '$lib/Header.svelte'
  import Footer from '$lib/Footer.svelte'

  let shiftContentRight = false

  function chaChaSlide({ detail }) {
    shiftContentRight = detail.sideNavIsOpen
  }
</script>

<template lang="pug">
  Header(on:sideNavEvent='{chaChaSlide}')
  main: slot
  Footer
</template>

<style lang="stylus">
  main
    transition: $sidenav-transition
    flex 1
    padding 30px
    background theme_color
    max-width: 500px;
    @media screen and (min-width: 500px)
      width: 80%;
      border-radius: 20px
      margin: 2% auto
  .shiftRight
    margin-left: $sidenav-width
</style>
