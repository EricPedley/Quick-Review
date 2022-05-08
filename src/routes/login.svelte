<script lang="ts">
  import { createClient, loginWithPopup } from '$lib/auth'
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'

  let client

  async function login() {
    client = await createClient()
    const res = await loginWithPopup(client, {})
    $session.isAuthenticated = await client.isAuthenticated()
    const user = await client.getUser()
    $session.user = user
    document.cookie = `user=${JSON.stringify(user)}`;
    goto('/profile')
  }
</script>

<template lang="pug">
  .form
    h1 Login
    hr
    button(type='submit' on:click='{login}')
      img(src='/auth0.svg' height='30rem')
      h1 Login
</template>

<style lang="stylus">
  .form
    height: 100%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-evenly

  hr
    width: 75%
    height: .25rem
    background: white
    border-radius: .125rem

  button
    padding: 0 3rem
    height: 5rem

    display: flex
    align-items: center
    justify-content: space-evenly
    gap: 2rem

    background: secondary_color
    transition: 200ms
    border-radius: 0.5rem
    border: none

    &:hover
      background: black
      color: white
</style>
