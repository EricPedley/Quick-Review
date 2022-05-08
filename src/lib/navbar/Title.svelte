<template lang="pug">
  a(href='/')
    img(src='/logo.png' height='60px')
    span#title
      span.big Q
      span.small uick
      span.big R
      span.small eview

</template>

<style lang="stylus">
  a
    text-decoration: none
    font-weight: 700
    color: white

    display: flex
    align-items: center

  .big
    font-family: 'Poppins', monospace, bold
    color: black
    font-size: 4rem
  #title
    letter-spacing 2px
    @media screen and (max-width: 500px)
      display none

  .small
    font-size: 2rem

  img
    height 5rem
    @media screen and (min-width: 500px)
      margin-right: 1.5rem
</style>
