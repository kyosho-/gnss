import { Satellite } from './satellite';

describe('Satellite', () => {
  it('should create an instance', () => {
    const svid = 1;
    const elv = 2;
    const az = 3;
    const cno = 4;
    const target = new Satellite(svid, elv, az, cno);
    expect(target).toBeTruthy();
    expect(target.svid).toEqual(svid);
    expect(target.elv).toEqual(elv);
    expect(target.az).toEqual(az);
    expect(target.cno).toEqual(cno);
  });
});
