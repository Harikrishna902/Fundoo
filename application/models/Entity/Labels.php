<?php
namespace Entity;
use Doctrine\Common\Collections\ArrayCollection;
/**
 * Labels Model
 *
 * @Entity
 * @Table(name="Labels")
 */
class Labels{
    /**
	 *  @Id @Column(type="integer") @GeneratedValue
	 * 
	 */
    protected $id;
    /**
	 *  @Column(type="string")
	 *  */
    protected $labelname;
  
    /**
     *  @Column(type="integer" )
     */
    protected $uid;
    


    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set labelname.
     *
     * @param string $labelname
     *
     * @return Labels
     */
    public function setLabelname($labelname)
    {
        $this->labelname = $labelname;

        return $this;
    }

    /**
     * Get labelname.
     *
     * @return string
     */
    public function getLabelname()
    {
        return $this->labelname;
    }

    /**
     * Set uid.
     *
     * @param int $uid
     *
     * @return Labels
     */
    public function setUid($uid)
    {
        $this->uid = $uid;

        return $this;
    }

    /**
     * Get uid.
     *
     * @return int
     */
    public function getUid()
    {
        return $this->uid;
    }
}
