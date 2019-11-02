import { mapToEnum } from './map-to-enum';

enum StandardMessageId {
  DTM = 'DTM',
  GBQ = 'GBQ',
  GBS = 'GBS',
  GGA = 'GGA',
  GLL = 'GLL',
  GLQ = 'GLQ',
  GNQ = 'GNQ',
  GNS = 'GNS',
  GPQ = 'GPQ',
  GRS = 'GRS',
  GSA = 'GSA',
  GST = 'GST',
  GSV = 'GSV',
  RMC = 'RMC',
  TXT = 'TXT',
  VLW = 'VLW',
  VTG = 'VTG',
  ZDA = 'ZDA'
}

describe('MapToEnum', () => {
  it('should be converted enum.', () => {
    let midStr = 'DTM';
    let mid = mapToEnum(StandardMessageId, midStr);
    expect(mid).toEqual(StandardMessageId.DTM);

    midStr = 'error';
    mid = mapToEnum(StandardMessageId, midStr);
    expect(mid).not.toEqual(midStr);
    expect(mid).toBeUndefined();
  });

  it('should be converted array.', () => {
    const midStr = 'piyo';
    let mid = mapToEnum(['hoge', 'piyo', 'fuga'], midStr);
    expect(mid).toEqual(midStr);

    mid = mapToEnum(['hoge', 'piyo_error', 'fuga'], midStr);
    expect(mid).not.toEqual(midStr);
    expect(mid).toBeUndefined();
  });
});
