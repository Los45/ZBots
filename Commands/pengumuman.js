function pengumuman(user, channel, params, client) {
  if (channel.id !== '1169588638292643965') return 1;

  const infoChannel = channel.guild.channels.cache.get('1169589106251149342');
  if (!params || params.length === 0) {
      return channel.send('```PAKAI : !pengumuman [Text]```');
  }

  const message = params.join(' ');
  infoChannel.send(message);
  channel.send('```Pengumuman anda berhasil dikirimkan oleh Server Bot!```');
  return 1;
}
