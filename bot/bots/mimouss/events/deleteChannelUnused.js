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
    if (oldState.channel.members.size === 0 && oldState.channel.id !== '1214670999027458149') {
      oldState.channel.delete();
    }
  },
};
