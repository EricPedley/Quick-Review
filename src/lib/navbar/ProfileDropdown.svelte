<script lang="ts">
  import { createClient, logout } from '$lib/auth'
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'
  let username = 'defaultusername'

  async function handleLogout() {
    document.cookie = 'user={}; path=/'
    const client = await createClient()
    await logout(client)
    $session.isAuthenticated = false
  }
  export let showProfileDropdown = true
</script>

<template lang="pug">
  .profileDropdown(class:hidden='{!showProfileDropdown}')
    ul
      li 
        span.fa-solid.fa-address-book.fa-1x
        a(href='/profile') Account

      li
        span.fa-solid.fa-sliders.fa-1x
        a(href='/create') New QR

      li
        span.fa-solid.fa-sliders.fa-1x
        a(href='/profile/codeListing') Owned QR

      li
        span.fa-solid.fa-arrow-right-from-bracket.fa-1x
        button(on:click|preventDefault='{handleLogout}') Logout
</template>

<style lang="stylus">
  .profileDropdown
    position: absolute
    right: 0
    height: 15rem
    width: 10rem

    display: flex
    flex-direction: column
    align-items: center

    overflow: hidden
    transition: 300ms
    background: secondary_color

  .hidden
    height: 0

  ul
    height: 100%
    
    display: flex
    flex-direction: column
    justify-content: space-evenly
    align-items: center
    gap: 1rem

    list-style: none

  span
    margin-right: 0.5rem

  a, button
    font-size: 1rem
    color: black
    text-decoration: none
    background: none
    border: none

    transition: 350ms
    &:hover
      cursor: pointer
      color: #555
</style>
