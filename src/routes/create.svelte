<script lang="ts" context="module">
  export async function load({ url, fetch }) {
    const assetId = url.searchParams.get('id')
    if(url.searchParams.get('review')?.length>0) {
      const reviewObject = {
        rating: url.searchParams.get('rating'),
        review: url.searchParams.get('review')
      }
      const customAttributes = {}
      await fetch('/api/review', {
        method: 'POST',
        body: JSON.stringify({
          reviewObject,
          assetId,
          customAttributes
        })
      })
      return {
        status: 302,
        redirect: `/scan?scanId=${url.searchParams.get('scanId')}`
      }
    } else {
      await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({
          name: url.searchParams.get('name'),
          description: url.searchParams.get('description'),
          assetId,
        })
      })
    }
    return {
      status: 302,
      redirect: '/profile/codeListing'
    }
  }
</script>