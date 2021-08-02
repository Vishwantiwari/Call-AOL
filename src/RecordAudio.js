import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import {Buffer} from 'buffer';

// AudioRecord.start();
export default function RecordAudio() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const options = {
    sampleRate: 44100, // default 44100
    channels: 2, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    wavFile: `test_${audioFiles.length}.wav`, // default 'audio.wav'
  };

  AudioRecord.init(options);

  const stopAudioRecording = async () => {
    const audioFile = await AudioRecord.stop();
    setAudioFiles([...audioFiles, audioFile]);
    console.log(audioFiles.length);
    AudioRecord.on('data', data => {
      // console.log(data);
      // base64-encoded audio data chunks
      const chunk = Buffer.from(data, 'base64');
      // console.log(chunk);
    });
  };

  useEffect(() => {
    console.log(audioFiles);
  }, [audioFiles]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {!isRecording && (
          <Button
            style={styles.button}
            title={'Start Recording'}
            onPress={() => {
              setIsRecording(true);
              AudioRecord.start();
            }}
          />
        )}
        {isRecording && (
          <Button
            style={styles.button}
            title="Stop Recording"
            onPress={async () => {
              setIsRecording(false);
              await stopAudioRecording();
            }}
          />
        )}
      </View>
      <View>
        {audioFiles.map((aF, i) => {
          console.log(aF);
          return <Text key={i}>{aF}</Text>;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
});
