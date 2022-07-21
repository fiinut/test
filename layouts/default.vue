<template>
  <b-container>
    <!-- <NuxtLink to="/add-content"><b-button variant="danger">Add New Content</b-button></NuxtLink>
     <NuxtLink to="/home"><b-button variant="success">Home</b-button></NuxtLink>
     <NuxtLink to="/login"><b-button variant="outline-primary">Log out</b-button></NuxtLink> -->
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/home">Home</b-nav-item>
          <b-nav-item href="/add-content">Add New Content</b-nav-item>
          <b-nav-item href="/client-search">Client Page</b-nav-item>
          <b-nav-item href="/client-home">Client Home</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="/login">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt />
  </b-container>
</template>
