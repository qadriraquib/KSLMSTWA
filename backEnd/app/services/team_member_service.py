from sqlalchemy.orm import Session
from app.models.team_member import TeamMember

def create_team_member(db: Session, **data):
    member = TeamMember(**data)
    db.add(member)
    db.commit()
    db.refresh(member)
    return member

def get_all_team_members(db: Session):
    return db.query(TeamMember).all()

def delete_team_member(db: Session, member_id):
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if member:
        db.delete(member)
        db.commit()
    return member
