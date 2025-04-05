// Dependencies
import TextAnimation from "text-animation";

// Animate bottom-top
export const Animation = TextAnimation("Uploading...", function (err) {
    if (err) throw err;
    // And then, top-bottom
    TextAnimation({
        text: "Please Wait!..."
        , animation: "top-bottom"
    });
});
