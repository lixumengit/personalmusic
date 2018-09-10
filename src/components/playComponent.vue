<template>
    <aplayer autoplay :music="{
        title: 'Preparation',
        author: 'Hans Zimmer/Richard Harvey',
        url: 'http://devtest.qiniudn.com/Preparation.mp3',
        pic: 'http://devtest.qiniudn.com/Preparation.jpg',
        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
    }">
    </aplayer>
</template>
<script>
    import Aplayer from 'vue-aplayer'
    export default {
        data(){
            return {

            }
        },
        components : {
            Aplayer
        }
    }
</script>
