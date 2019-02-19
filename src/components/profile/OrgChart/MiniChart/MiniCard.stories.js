storiesOf('MiniChart component', module)
  .add(
    'Only required options',
    withInfo({
      header: true,
      inline: true,
      source: false,
    })(() => (
      <div>
        <MiniChart />
      </div>
    )),
  )
  .add(
    'Using cards',
    withInfo({
      header: true,
      inline: true,
      source: false,
    })(() => {
      const { boxes } = calculateTree({
        nodeA: luc,
        root: NRCOrgChart,
        cardHeight: 10,
        cardWidth: 10,
        cardPadding: 10,
      });
      return (
        <div>
          <MiniChart cards={boxes} />
        </div>
      );
    }),
  )
  .add(
    'Using cards and lines',
    withInfo({
      header: true,
      inline: true,
      source: false,
    })(() => {
      const { boxes, lines } = calculateTree({
        nodeA: luc,
        root: NRCOrgChart,
        cardHeight: 10,
        cardWidth: 10,
        cardPadding: 10,
      });
      return (
        <div>
          <MiniChart cards={boxes} lines={lines} />
        </div>
      );
    }),
  )
  .add(
    'Using cards, lines and overlay',
    withInfo({
      header: true,
      inline: true,
      source: false,
    })(() => {
      const { boxes, lines } = calculateTree({
        nodeA: luc,
        root: NRCOrgChart,
        cardHeight: 10,
        cardWidth: 10,
        cardPadding: 10,
      });
      return (
        <div>
          <MiniChart
            cards={boxes}
            lines={lines}
            overlay={{
              x1: 35,
              x2: 135,
              y1: 130,
              y2: 240,
            }}
          />
        </div>
      );
    }),
  );
