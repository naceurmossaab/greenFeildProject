const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
let { keys } = require("./settings");
const User = require("../models/user");

// passport don't use middleware, but strategies
passport.use(
    new GoogleStrategy(
        {
            // options for the google strategy
            callbackURL: "/auth/google/redirect",
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
        },
        async (accessToken, refreshToken, profile, done) => {
            let user = {
                fullname: profile._json.name,
                // firstname: profile._json.given_name,
                // lastname: profile._json.family_name,
                email: profile._json.email,
                // gmail_verified: profile._json.email_verified,
                // googleId: profile._json.sub,
                profile_image_uri: profile._json.picture.slice(
                    0,
                    profile._json.picture.indexOf("=s96-c")
                ),
            };

            try {
                let foundUser = await User.findOne({ email: user.email });
                // if user doesn't exist inside the database
                if (!foundUser) {
                    // so we save it into the database
                    savedUser = await new User(user).save();
                    // console.log(newUser);
                    done(null, savedUser);
                } else {
                    // the user exists already inside our databse
                    // we update it
                    updatedUser = await User.findByIdAndUpdate(
                        { _id: foundUser._id },
                        user,
                        {
                            new: true,
                        }
                    );
                    // console.log("Updated user is:", updatedUser);
                    done(null, updatedUser);
                }
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id); // this will attach the user id to the request
    // then, inside the app.js, the app.use(cookieSession()) middleware, will make sure if it's a daylong
    // then encrypting it
    // then will send it to the browser
    // and all of this is happened, once the user is logged in
});

passport.deserializeUser(async (id, done) => {
    // this callback function is executed each time when a user make a request
    // so on each request he send the encrypted cookie to be de-encrypted
    // then we can deserialize the user by grabbing the id
    // and assosiating it with a user in our database
    // so we know then what user is associated in a session
    // so we know that he's logged in, in that time
    try {
        let foundUser = await User.findById(id);
        done(null, foundUser);
    } catch (error) {
        done(error, null);
    }
});
