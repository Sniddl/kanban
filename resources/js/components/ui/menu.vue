<template lang="html">

  <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><a>Dashboard</a></li>
      <li><a>Customers</a></li>
    </ul>
    <p class="menu-label">
      Administration
    </p>
    <ul class="menu-list">
      <li><a>Team Settings</a></li>
      <li>
        <a data-toggle="#team">Manage Your Team</a>
        <ul id="team" class="sub">
          <li><a>Members</a></li>
          <li><a>Plugins</a></li>
          <li><a>Add a member</a></li>
        </ul>
      </li>
      <li><a>Invitations</a></li>
      <li><a>Cloud Storage Environment Settings</a></li>
      <li><a>Authentication</a></li>
    </ul>
    <p class="menu-label">
      Transactions
    </p>
    <ul class="menu-list">
      <li><a>Payments</a></li>
      <li><a>Transfers</a></li>
      <li><a>Balance</a></li>
    </ul>
  </aside>

</template>

<script>
export default {
  props: ['baseurl'],
  mounted() {
    /** @TODO planning on making this auto detect the current url then
     *        highlight the proper link in the sidebar. But since
     *        I don't know how we are going to setup our link
     *        yet, then I'm going to hold off on it.
     * ----------------------------------------------------------------------------------------
     *      $('.sub').hide()
     *      $('[data-toggle]').click(function(){
     *        $( $(this).data('toggle') ).toggle()
     *      })
     *      let pathname = document.location.pathname
     *      let routes = pathname.slice(this.baseurl.length, pathname.length).split('/')
     *      let params
     *      for (var i = 0; i < routes.length; i++) {
     *        if (i == 0) params += '#'+routes[i]
     *      }
     * ----------------------------------------------------------------------------------------
    */
  }

}
</script>

<style lang="scss">

</style>
