export type SessionType = {
  project: string;
  description: string;
  start: string;
  end: string;
  color: string;
};

export type DataType = {
  monday: SessionType[],
  tuesday: SessionType[],
  wednesday: SessionType[],
  thursday: SessionType[],
  friday: SessionType[],
  saturday: SessionType[],
  sunday: SessionType[]
};

export default SessionType;
