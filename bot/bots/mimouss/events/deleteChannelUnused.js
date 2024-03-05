const { Events } = require('discord.js');

module.exports = {
  name: Events.VoiceStateUpdate,
  /**
   * @param {VoiceState} oldState
   * @param {VoiceState} newState
   * @returns
   */
  async execute(oldState) {
    if (!oldState.channelId) return;
    console.log('oldState', oldState.channelId);
    console.log('Count User in channel', oldState.channel.members.size);
    if (oldState.channel.members.size === 0 && oldState.channel.id !== '1214670999027458149') {
      oldState.channel.delete();
    }
  },
};
