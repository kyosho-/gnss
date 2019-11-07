import { Nmea } from './nmea';

describe('Nmea', () => {
  it('should create instance.', () => {
    const messages = [];
    messages.push('!AIVDM,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0*5C');
    messages.push('!AIVDM,2,1,3,B,55P5TL01VIaAL@7WKO@mBplU@<PDhh000000001S;AJ::4A80?4i@E53,0*3E');
    messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55');

    for (const message of messages) {
      const nmea: Nmea = new Nmea(message);
      expect(nmea).toBeTruthy(message);
    }
  });

  it('should not create instance.', () => {
    const messages = [];
    messages.push('!AIVDM,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0*5D');

    for (const message of messages) {
      try {
        const nmea: Nmea = new Nmea(message);
        // tslint:disable-next-line: no-unused-expression
        nmea.address;
        fail('到達しない');
      } catch (e) {
        expect(e.message).toEqual(`Checksum is not match. (line=${message})`);
      }
    }
  });

  it('is valid.', () => {
    // const messages = [];
    // messages.push('!AIVDM,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0*5C');
    // messages.push('!AIVDM,2,1,3,B,55P5TL01VIaAL@7WKO@mBplU@<PDhh000000001S;AJ::4A80?4i@E53,0*3E');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55\n');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55\r\n');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55\r');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\n');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\r');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\r\n');

    // for (const message of messages) {
    //   expect(Nmea.validate(message).isValid).toBeTruthy(message);
    // }

    const messageMap: Map<string, number> = new Map<string, number>();
    messageMap.set('AIVDM,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0', 0x5C);
    messageMap.set('AIVDM,2,1,3,B,55P5TL01VIaAL@7WKO@mBplU@<PDhh000000001S;AJ::4A80?4i@E53,0', 0x3E);
    messageMap.set('AIVDM,2,2,3,B,1@0000000000000,2', 0x55);
    messageMap.set('GNTXT,01,01,02,u-blox AG - www.u-blox.com', 0x4E);
    messageMap.forEach((value: number, key: string, map: Map<string, number>) => {
      expect(Nmea.validate(key, value)).toBeTruthy();
    });
  });

  it('is not valid.', () => {
    const messages = [];
    // messages.push('!AIVDM,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0*5D');
    // messages.push('!AIVD,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0*5D');
    // messages.push('!AIVD5,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0*5D');
    // messages.push('!AIVDM1,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0*5D');
    // messages.push('!AIVDMA,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0*5D');

    // for (const message of messages) {
    //   expect(Nmea.validate(message).isValid).toBeFalsy(message);
    // }

    const messageMap: Map<string, number> = new Map<string, number>();
    messageMap.set('AIVDM,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0', 0x5D);
    messageMap.forEach((value: number, key: string, map: Map<string, number>) => {
      expect(Nmea.validate(key, value)).toBeFalsy(`key:${key}, value:${value}`);
    });
  });

  it('can get values1.', () => {
    const messages = [];
    // messages.push('!AIVDM,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0*5C');
    // messages.push('!AIVDM,2,1,3,B,55P5TL01VIaAL@7WKO@mBplU@<PDhh000000001S;AJ::4A80?4i@E53,0*3E');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55\n');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55\r\n');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55\r');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\n');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\r');
    messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\r\n');

    for (const message of messages) {
      const nmea: Nmea = new Nmea(message);
      // expect(nmea.getTalkerId()).toEqual('GN');
      // expect(nmea.getMessageId()).toEqual('TXT');
      expect(nmea.address).toEqual('GNTXT');
      expect(nmea.value).toEqual('01,01,02,u-blox AG - www.u-blox.com');
    }
  });

  it('can get values2.', () => {
    const messages = [];
    // messages.push('!AIVDM,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0*5C');
    // messages.push('!AIVDM,2,1,3,B,55P5TL01VIaAL@7WKO@mBplU@<PDhh000000001S;AJ::4A80?4i@E53,0*3E');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55\n');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55\r\n');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55\r');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\n');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\r');
    messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\r\n');

    for (const message of messages) {
      const nmea: Nmea = new Nmea(message);
      // expect(nmea.getTalkerId()).toEqual('GN');
      // expect(nmea.getMessageId()).toEqual('TXT');
      expect(nmea.address).toEqual('GNTXT');
      expect(nmea.value).toEqual('01,01,02,u-blox AG - www.u-blox.com');
    }
  });

  it('can get values3.', () => {
    const messages = [];
    // messages.push('!AIVDM,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0*5C');
    // messages.push('!AIVDM,2,1,3,B,55P5TL01VIaAL@7WKO@mBplU@<PDhh000000001S;AJ::4A80?4i@E53,0*3E');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55\n');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55\r\n');
    // messages.push('!AIVDM,2,2,3,B,1@0000000000000,2*55\r');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\n');
    // messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\r');
    messages.push('$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\r\n');

    for (const message of messages) {
      const nmea: Nmea = new Nmea(message);
      // expect(nmea.getTalkerId()).toEqual('GN');
      // expect(nmea.getMessageId()).toEqual('TXT');
      expect(nmea.value).toEqual('01,01,02,u-blox AG - www.u-blox.com');
      expect(nmea.address).toEqual('GNTXT');
    }
  });
});
