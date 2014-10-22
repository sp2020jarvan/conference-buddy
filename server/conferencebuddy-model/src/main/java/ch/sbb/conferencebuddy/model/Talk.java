package ch.sbb.conferencebuddy.model;

import ch.sbb.esta.core.model.LongIdEntity;

import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;

/**
 * @author u215246 (Gilles Zimmermann)
 * @version $Id: $
 * @since 2014
 */
@MappedSuperclass
public abstract class Talk extends LongIdEntity {
    /**
     * vortrag-Id.
     */
    @NotNull
    private Long pid;
    /**
     * uuid as FK to {@link ch.sbb.conferencebuddy.model.User#id}
     */
    @NotNull
    private String userFk;

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public String getUserFk() {
        return userFk;
    }

    public void setUserFk(String userFk) {
        this.userFk = userFk;
    }
}
