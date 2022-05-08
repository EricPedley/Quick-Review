<script lang='ts' context='module'>
    export async function load({url, fetch, session}) {
        const scanId = url.searchParams.get('scanId')
        const {scan, user} = await fetch(`/api/scan?scanId=${scanId}`).then(r=>r.json())
        const assetId = scan.asset.assetId
        const userId = user?.email?.slice?.(0,user.email.indexOf('@'))
        const {isOwner} = await fetch(`/api/checkOwnership`,{
            method: 'POST',
            body: JSON.stringify({
                assetId, userId
            })
        }).then(r=>r.json())
        const isRegistered = scan.asset.customAttributes?.registered
        console.log(scan.asset)
        if(!isOwner && !isRegistered) {
            return {
                status: 302,
                redirect: '/login'
            }
        }
        const reviews = scan.asset.customAttributes?.reviews
        const props = {reviews, name: scan.asset.customAttributes?.name, description: scan.asset.description}
        return {
            props: {
                ...props,
                isOwner,
                isRegistered,
                assetId,
                scanId
            }
        }
    }
</script>

<script lang='ts'>
    import Display from '$lib/Display.svelte'
    export let name
    export let reviews
    export let description
    const props = {name, reviews, description}
    export let isOwner
    export let isRegistered
    export let assetId
    export let scanId
    let rating=10, review
</script>

<template lang="pug">
    +if('isRegistered')
        Display('{...props} showReviews=true')
        //this is a hack for my linter')
        +if('isOwner')
            h2 Edit Label Information
            +else
                h2 Leave your feedback
    form(action='/create')
        ul.flex-outer
            +if('isOwner')
                li
                    label(for='name') Name of Item
                        input(type='text' name='name' bind:value='{name}')
                li
                    label(for='description') Description
                        textarea(name='description' bind:value='{description}')
                +else
                    li
                        label(for='rating') Rating: {rating}
                            input(type='range' min="1" max="10" name='rating' bind:value='{rating}')
                    li
                        label(for='review') Review
                            textarea(name='review' bind:value='{review}')
            input(type='hidden' name='id' bind:value='{assetId}')
            input(type='hidden' name='scanId' bind:value='{scanId}')
            li
                button(type='submit') Submit
</template>

<style lang="stylus">
  .flex-outer{
    list-style-type: none;
    padding: 0;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .flex-outer li{
    justify-content center
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  
  .flex-outer > li:not(:last-child) {
    margin-bottom: 20px;
  }
  
  .flex-outer li label,
  .flex-outer li p {
    padding: 8px;
    font-weight: 300;
    letter-spacing: .09em;
    //text-transform: uppercase;
  }
  
  .flex-outer > li > label,
  .flex-outer li p {
    flex: 1 0 120px;
    max-width: 220px;
  }
  
  .flex-outer > li > label + *,
  .flex-inner {
    flex: 1 0 220px;
  }
  
  .flex-outer li p {
    margin: 0;
  }
  
  .flex-outer li input:not([type='checkbox']),
  .flex-outer li textarea {
    padding: 15px;
  }
  
  .flex-outer li button {
    margin-left: auto;
    margin-right auto
    padding: 8px 16px;
    border: none;
    background: #333;
    color: #f2f2f2;
    letter-spacing: .09em;
    border-radius: 2px;
  }
  
  .flex-inner li {
    width: 100px;
  }

  .flex-outer li input[type='range']{
    padding: 0
  }
  h2 
    margin-top 10px
    border-bottom 2px solid black
</style>
