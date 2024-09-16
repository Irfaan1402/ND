<template>
<!--   <div class="d-flex align-items-center justify-content-center">
    <img 
      style="width: 100%;" 
      src="https://scontent.fmru7-1.fna.fbcdn.net/v/t39.30808-6/437554383_3666537220249864_2979846986410022832_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=2285d6&_nc_ohc=WKseyYvIwx0Q7kNvgFtn8BG&_nc_ht=scontent.fmru7-1.fna&_nc_gid=AA7hUAHinW1khhK5CNo_XxC&oh=00_AYCyzCf0EsjFMNl-ZcyCt3bCpkoj1pRNYAGOF4QkiYBvEw&oe=66DE2B21"
      alt="Background Image"
    />
  </div> -->

  <div class="main-container d-flex flex-column align-items-center justify-content-center">
    <div class="bg-white rounded-md shadow overflow-hidden col-sm-12 w-full p-4">
      <p class="text-muted mb-4">Title: <b>{{ meeting.title }}</b></p>
      <p class="text-muted mb-4">Date: <b>{{ meeting.date }}</b></p>
      <p class="text-muted mb-4">Office: <b>{{meeting.office}}</b></p>
    </div>
    <div class="content-wrapper text-center p-4 mt-10">
      <!-- Header -->
    

      <template v-if="!addNew">
        <!-- Large Search Bar -->
        <input
          type="text"
          v-model="searchQuery"
          class="form-control form-control-lg"
          placeholder="Type your name..."
          aria-label="Search"
          aria-describedby="button-addon2"
        />
  
        <!-- User List Below Search Bar -->
        <div class="user-list mt-4">
          <div v-for="user in filteredUsers" :key="user.id" class="user-item d-flex align-items-center mb-2">
            <input
              type="checkbox"
              :id="`user-${user.id}`"
              class="form-check-input me-2"
              v-model="selectedMembers" 
              @change="addMember(user)"
            />
            <label :for="`user-${user.id}`" class="form-check-label">
              {{ user.name }}
            </label>
          </div>
        </div>
      </template>
      <template v-else>
          <input type="text" v-model="form.name" class="form-control form-control-lg mb-3" placeholder="Full Name"/>
          <input type="text" v-model="form.email" class="form-control form-control-lg mb-3" placeholder="Email"/>
          <input type="text" v-model="form.locality" class="form-control form-control-lg mb-3" placeholder="Locality"/>
          <input type="text" v-model="form.phone" class="form-control form-control-lg mb-3" placeholder="Phone"/>
          <input type="text" v-model="form.constituency" class="form-control form-control-lg mb-3" placeholder="Constituency"/>
      </template>

    </div>

    <!-- Green Button -->
    <div class="button-container mt-4">
      <button v-if="!addNew" class="btn btn-primary" @click="addNew = true">New Member</button>
      <button v-if="!addNew" class="btn btn-success ml-3" @click="addNew = true">End</button>
      <button v-if="addNew" class="btn btn-success" @click="addNew = false">Save</button>
      <button v-if="addNew" class="btn btn-danger ml-3" @click="addNew = false">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meeting: Array,
    members: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchQuery: '',
      currentDate: new Date().toLocaleDateString(), // Format today's date
      addNew: false,
      form: this.$inertia.form({
        name: null,
        email: null,
        phone: null,
        locality: null,
        constituency: null,
      }),
      selectedMembers: [], // Track selected members
    };
  },
  computed: {
    filteredUsers() {
      const query = this.searchQuery.toLowerCase();
      if (!query) {
        return this.members;
      }
      return this.members.filter(user => 
        user.name.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    addMember(user) {
      // Log the checked member's name to the console
      if (this.selectedMembers.includes(user.id)) {
        console.log(`Checked member: ${user.name}`);
      } else {
        console.log(`Unchecked member: ${user.name}`);
      }
    },
  },
};
</script>

<style scoped>
/* Background gradient for the entire page */
.main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #8a0b0b, #031934);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Content wrapper with rounded corners and shadow */
.content-wrapper {
  width: 100%;
  background: #fff; /* Add a background color for better readability */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* Header and date styling */
h1 {
  color: #333;
  font-size: 2rem;
}

p {
  font-size: 1rem;
  color: #6c757d;
}

/* Search bar customizations */
.form-control {
  border-radius: 8px;
}

/* User list styling */
.user-list {
  max-height: 300px; /* Optional: Set a max height for scrollable list */
  min-height: 300px; /* Optional: Set a max height for scrollable list */
  overflow-y: auto; /* Scroll if content exceeds max height */
}

.user-item {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.user-item:last-child {
  border-bottom: none;
}

/* Additional form styling */
.form-check-input {
  cursor: pointer;
}

.form-check-label {
  font-weight: bold;
}

/* Green button styling */
.button-container {
  margin-top: 20px;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  color: #fff;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .content-wrapper {
    width: 100%;
    padding: 20px;
  }
}
</style>
