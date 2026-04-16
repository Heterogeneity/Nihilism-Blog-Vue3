import {defineStore} from "pinia";
import {ref, watch} from "vue";

export interface Tag {
    title: string,
    name: string
}

function initState() {
    const savedTags: any = localStorage.getItem("tags")
    let initialTags: Tag[] = []
    if (savedTags !== '[]' && savedTags !== null) {
        initialTags = JSON.parse(savedTags)
    } else {
        initialTags = [
            {
                title: "主页",
                name: "home"
            }
        ]
        localStorage.setItem("tags", JSON.stringify(initialTags))
    }
    return {
        tags: initialTags
    }
}

export const useTagStore = defineStore('tag', () => {
    const state = ref(initState())
    // 监视 tags 的变化并更新 localStorage
    watch(() => state.value.tags, (newTags) => {
        localStorage.setItem("tags", JSON.stringify(newTags))
    }, {deep: true})

    const addTag = (newTag: Tag) => {
        state.value.tags.push(newTag)
    }

    const removeTag = (tagName: string) => {
        state.value.tags = state.value.tags.filter(tag => tag.name !== tagName)
    }

    return {state, addTag, removeTag}
})
