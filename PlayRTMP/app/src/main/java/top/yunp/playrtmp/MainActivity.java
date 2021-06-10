package top.yunp.playrtmp;

import androidx.appcompat.app.AppCompatActivity;

import android.net.Uri;
import android.os.Bundle;

import org.videolan.libvlc.LibVLC;
import org.videolan.libvlc.Media;
import org.videolan.libvlc.MediaPlayer;
import org.videolan.libvlc.util.VLCVideoLayout;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private LibVLC libVLC;
    private MediaPlayer mediaPlayer;
    private VLCVideoLayout videoLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        libVLC = new LibVLC(this);
        mediaPlayer = new MediaPlayer(libVLC);
        videoLayout = findViewById(R.id.vlcVideoLayout);
    }

    @Override
    protected void onStart() {
        super.onStart();

        mediaPlayer.attachViews(videoLayout, null, true, false);
//        try {
//            mediaPlayer.playAsset(this, "video.mp4");
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        mediaPlayer.play(Uri.parse("rtmp://10.0.2.2/flv/s"));
    }

    @Override
    protected void onStop() {
        super.onStop();
        mediaPlayer.detachViews();
        mediaPlayer.stop();
    }

    @Override
    protected void onDestroy() {
        mediaPlayer.release();
        libVLC.release();
        super.onDestroy();
    }
}