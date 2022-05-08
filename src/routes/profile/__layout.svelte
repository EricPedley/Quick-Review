<script lang="ts" context="module">
  export async function load({ session }) {
    return {
      props: {},
    }
  }
</script>

<script lang="ts">
  import { createClient } from '$lib/auth'
  import { onMount } from 'svelte'
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'

  let client
  let loading = true

  onMount(async () => {
    client = await createClient()
    if (!$session.isAuthenticated) {
      const authAuthenticated = await client.isAuthenticated()
      if (!authAuthenticated) {
        goto('/login')
        return
      }
    }
    $session.isAuthenticated = true
    const user = await client.getUser()
    $session.user = user
    document.cookie = `user=${JSON.stringify(user)}`
    loading = false
  })
</script>

<template lang="pug">
  +if('!loading')
    .profile
      h1 Welcome {$session.user?.given_name}
      slot
</template>

<style lang="stylus">
  h1
    text-align: center
    margin-bottom: 2rem
</style>
