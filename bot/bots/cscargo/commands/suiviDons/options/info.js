
module.exports = {
  async infoReply(interaction) {
    const member = interaction.options.getUser('user');
    const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);

    const user = await User.findOne({
      where: { discord_id: (isAdmin) ? member.id : interaction.member.id },
      include: ['donateurUser'],
    });

    let text = '';
    if (user.donateurUser) {
      if (!isAdmin) {
        text = `Actuellement le solde de tes dons est :  ${user.donateurUser.solde} €`;
      } else {
        text = `Actuellement le solde des dons de ${member} est :  ${user.donateurUser.solde} €`;
      }
    } else if (!isAdmin) {
      text = 'Désolé mais tu n\'es pas donateur';
    } else {
      text = `Désolé mais ${member} n'est pas donateur`;
    }

    if (!member) {
      const soldeCompte = await Don.Solde();
      text = `Actuellement il y a ${soldeCompte} € sur les comptes`;
    }

    await interaction.reply(text);
  }
};