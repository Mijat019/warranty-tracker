import passport from "passport";
import FacebookStrategy from "passport-facebook";
import { IUser, User } from "./models/IUser";

passport.serializeUser((user: any, done) => done(null, user._id));
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err, null));
});
