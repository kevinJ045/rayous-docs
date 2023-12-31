# Video

A video controller widget.

### Constructor

```javascript
constructor(src: string | object, options: object)
``` 

#### Setters
| Setter | Type | Description |
| --- | --- | --- |
| `src` | string | The URL or pathname for the Image `src`. |
| `controls` | boolean | Specify wether video has controls. |
| `autoplay` | boolean | Specify wether video autoplays. |

#### Getters
| Getter | Description |
| --- | --- |
| `paused` | Is video pause or not. |
| `duration` | Total duration of the video. |
| `currentTime` | Current video time. |

#### Methods
| Method | Description |
| --- | --- |
| `play()` | Play video. |
| `pause()` | Pause video. |

#### Example
```ts
let video = new Video('/path/to/video.mp4');
// or
let video = new Video({ src: '/path/to/video.mp4', controls: true });
video.play();
let time = new Text(video.currentTime.toString());
```