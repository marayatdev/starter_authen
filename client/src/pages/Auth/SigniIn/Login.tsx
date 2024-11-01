import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import { GoogleButton } from "../LogoSignIn/GoogleButton";
import { TwitterButton } from "../LogoSignIn/TwitterButton";
import { login, register } from "../../../services/Auth/auth";
import { useNavigate } from "react-router-dom";
import type { Login, Register } from "../../../interfaces/Auth/auth";

export function Login() {
  const navigate = useNavigate();
  const [type, toggle] = useToggle(["login", "register"]);

  const LoginForm = useForm<Login>({
    initialValues: {
      email: "test1@gmail.com",
      password: "test",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 2
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const RegisterForm = useForm<Register>({
    initialValues: {
      username: "Jengs",
      email: "test1@gmail.com",
      password: "test",
    },
    validate: {
      username: (val) =>
        val.length <= 2 ? "Name should include at least 3 characters" : null,
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 2
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmitLogin = async (values: Login) => {
    try {
      const response = await login(values.email, values.password);
      sessionStorage.setItem("isAuth", "true");
      sessionStorage.setItem("userRole", response.role.toString());
      console.log(response.role);
      response.role === 1 ? navigate("/users") : navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);
      LoginForm.setErrors({
        email: "Login failed. Please check your credentials.",
      });
    }
  };

  const handleSubmitRegister = async (values: Register) => {
    try {
      await register(values.username, values.email, values.password);
      navigate("/home");
    } catch (error) {
      console.error("Register failed:", error);
      RegisterForm.setErrors({
        email: "Register failed. Please check your credentials.",
      });
    }
  };

  const toggleType = () => {
    toggle();
    LoginForm.reset();
    RegisterForm.reset();
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={
          type === "login"
            ? LoginForm.onSubmit(handleSubmitLogin)
            : RegisterForm.onSubmit(handleSubmitRegister)
        }
      >
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={RegisterForm.values.username}
              onChange={(event) =>
                RegisterForm.setFieldValue(
                  "username",
                  event.currentTarget.value
                )
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={
              type === "login"
                ? LoginForm.values.email
                : RegisterForm.values.email
            }
            onChange={(event) =>
              type === "login"
                ? LoginForm.setFieldValue("email", event.currentTarget.value)
                : RegisterForm.setFieldValue("email", event.currentTarget.value)
            }
            error={
              type === "login"
                ? LoginForm.errors.email && "Invalid email"
                : RegisterForm.errors.email && "Invalid email"
            }
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={
              type === "login"
                ? LoginForm.values.password
                : RegisterForm.values.password
            }
            onChange={(event) =>
              type === "login"
                ? LoginForm.setFieldValue("password", event.currentTarget.value)
                : RegisterForm.setFieldValue(
                    "password",
                    event.currentTarget.value
                  )
            }
            error={
              type === "login"
                ? LoginForm.errors.password &&
                  "Password should include at least 6 characters"
                : RegisterForm.errors.password &&
                  "Password should include at least 6 characters"
            }
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={toggleType}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
