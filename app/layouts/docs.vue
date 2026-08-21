<template>
  <div class="min-h-screen gradient-bg">
    <Header />
    <main class="pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="lg:flex lg:gap-10">
          <aside class="hidden lg:block w-64 shrink-0">
            <div class="sticky top-24">
              <DocsSidebar />
            </div>
          </aside>
          <div class="min-w-0 flex-1">
            <div class="lg:hidden mb-8">
              <DocsSidebar collapsible />
            </div>
            <slot />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
