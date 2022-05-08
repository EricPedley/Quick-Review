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
    font-family: 'Dancing Script', cursive
    color: salmon
    font-size: 3.5rem
  #title
    @media screen and (max-width: 500px)
      display none

  .small
    font-size: 2rem

  img
    margin-right: 1.5rem
</style>
