import Post from './models/post'

export default function createFakeData() {
    // 0, 1 .. 39 로 이루어진 배열을 생성한 후 포스트 데이터로 변환
    const posts = [...Array(40).keys()].map( i => ({
        title: `Post #${i}`,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel aliquam lorem, venenatis tincidunt justo. Quisque a molestie dolor. In eu diam ex. Aliquam varius vel justo in mollis. Suspendisse sed risus ac nisl venenatis blandit. Vivamus neque nisl, suscipit pellentesque lacus eu, cursus varius odio. Sed laoreet orci at mauris condimentum, sed scelerisque quam bibendum. Duis rutrum dignissim hendrerit. Suspendisse vitae urna sodales, efficitur velit in, posuere ex. Etiam erat orci, vestibulum id tincidunt vel, posuere accumsan est.  Mauris at rutrum nunc. Curabitur eleifend sit amet eros quis pellentesque. Curabitur id massa eu arcu suscipit porta sit amet vitae velit. Maecenas et diam turpis. Integer lacinia molestie ante, vel consequat arcu sagittis vitae. Nam in tempor mi. Duis finibus arcu lorem. Phasellus at malesuada elit. Fusce congue dapibus nisi, nec ornare elit mattis a. Suspendisse dignissim nibh id odio scelerisque pharetra. Etiam sodales tortor id orci commodo, suscipit pharetra orci interdum. Aenean a purus vel dolor tincidunt luctus a vitae tellus. Proin sit amet porttitor eros, ac placerat elit. Donec non bibendum odio, ac venenatis tortor. Nulla faucibus felis ligula, vel hendrerit magna tincidunt sit amet. Duis auctor finibus urna, scelerisque porta dolor auctor vel. Aenean id egestas purus.',
        tags: ['fake', 'data']
    }))
    Post.insertMany(posts, (err, docs) => {
        console.log(docs)
    })
}