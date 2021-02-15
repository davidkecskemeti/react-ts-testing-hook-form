import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export interface SignInProps {
  onSubmit?: () => void;
}

interface FormProps {
  username: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = yup.object({
  email: yup.string().email("Enter a valid email").required("Required"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(6, "Password should be longer than 6 characters")
    .required("Required"),
});

const SignIn: React.FC<SignInProps> = ({
  onSubmit = () => async (data: FormProps) => alert(JSON.stringify(data)),
}) => {
  const classes = useStyles();

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Controller
                as={Checkbox}
                control={control}
                name="remember"
                color="primary"
                defaultValue={false}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            data-testid="button"
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
