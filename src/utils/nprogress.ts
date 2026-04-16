import NProgress from "nprogress";

NProgress.configure({
    easing: "ease",
    speed: 1000,
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.1,
})

export const start = () => {
    NProgress.start()
}

export const end = () => {
    NProgress.done()
}