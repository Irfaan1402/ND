import '../css/app.css'
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import 'bootstrap'; // Import Bootstrap JS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import '../css/app.css'; // Import your custom CSS (optional)
import '../css/custom.css'; // Import your custom CSS (optional)
createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
    return pages[`./Pages/${name}.vue`]
  },
  title: title => title ? `${title} - Ping CRM` : 'Ping CRM',
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
