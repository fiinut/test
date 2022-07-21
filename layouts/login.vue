<template>
  <b-container class="my-5 text-center">
    <h1>Wecome to Content Management Website</h1>
    <b-form @submit.stop.prevent="login">
      <div class="content-login">
        <div role="group" class="input-username">
          <b-form-input
            id="input-live"
            v-model="$v.form.username.$model"
            :state="validateState('username')"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Username"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            กรุณากรอก username
          </b-form-invalid-feedback>
        </div>
        <div role="group" class="input-password">
          <b-form-input
            id="input-live"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Password"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            กรุณากรอก password
          </b-form-invalid-feedback>
        </div>

        <b-button type="submit" block variant="dark">Login</b-button>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    login() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="scss">
.content-login {
  padding: 0 30%;
  input {
    margin-top: 20px;
  }
}
</style>
