<script lang="ts">
  import SideNav from '$lib/navbar/SideNav.svelte'
  import Title from '$lib/navbar/Title.svelte'
  import ProfileDropdown from '$lib/navbar/ProfileDropdown.svelte'

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  import clickOutside from '$lib/utils/clickOutside'

  let showSideNav = false
  let showProfileDropdown = false

  function toggleSideNav() {
    showSideNav = !showSideNav

    dispatch('sideNavEvent', { sideNavIsOpen: showSideNav })
  }

  function closeSideNav() {
    showSideNav = false
    dispatch('sideNavEvent', { sideNavIsOpen: false })
  }

  function toggleProfileDropdown() {
    showProfileDropdown = !showProfileDropdown
  }

  function closeProfileDropdown() {
    showProfileDropdown = false
  }
</script>

<template lang="pug">
  header
    .hamburger: span.fa-solid.fa-bars.fa-3x(
      on:click='{toggleSideNav}'
      use:clickOutside
      on:outclick='{closeSideNav}'
    )
    .title: Title
    .profileIcon: span.fa-solid.fa-user.fa-3x(
      on:click='{toggleProfileDropdown}'
      use:clickOutside
      on:outclick='{closeProfileDropdown}'
    )

  .sideNav: SideNav(showSidebar='{showSideNav}')
  .profileDropdown: ProfileDropdown(showProfileDropdown='{showProfileDropdown}')
</template>

<style lang="stylus">
  header
    position: relative
    padding: 0.5rem 2rem

    display: flex
    align-items: center

    background: theme_color

  span
    transition: 300ms

    &:hover
      color secondary_color
      cursor pointer

  .title
    display: flex
    justify-content: center
    align-items: center
    flex-grow: 1
</style>
